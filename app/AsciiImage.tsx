'use client';
import Image from 'next/image';
import styles from './portfolio.module.scss';
import { useEffect, useRef } from 'react';

const glyphs = ' .:-=+*#%@';

type Particle = {
  x: number;
  y: number;
  glyph: string;
  alpha: number;
  driftX: number;
  driftY: number;
  accent: boolean;
};

type AsciiImageProps = {
  src: string;
  alt: string;
  sizes: string;
  fit: 'contain' | 'cover';
  position?: string;
  className?: string;
  priority?: boolean;
};

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function hash(row: number, col: number) {
  const value = Math.sin((row + 1) * 12.9898 + (col + 1) * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

export default function AsciiImage({
  src,
  alt,
  sizes,
  fit,
  position = 'center',
  className = '',
  priority = false,
}: AsciiImageProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const image = wrapper?.querySelector('img');
    const canvas = wrapper?.querySelector('canvas');
    const context = canvas?.getContext('2d');
    if (!wrapper || !image || !canvas || !context) return;

    const sampler = document.createElement('canvas');
    const sampleContext = sampler.getContext('2d', { willReadFrequently: true });
    if (!sampleContext) return;

    let particles: Particle[] = [];
    let logicalWidth = 0;
    let logicalHeight = 0;
    let ratio = 1;
    let cellSize = 12;
    let frame = 0;

    const render = () => {
      frame = 0;
      if (!image.complete || !image.naturalWidth || logicalWidth < 1 || logicalHeight < 1) return;

      const stage = wrapper.closest<HTMLElement>('[data-ascii-stage]');
      let scrollProgress = 0;
      if (stage) {
        const stickyElement = stage.querySelector<HTMLElement>('[data-ascii-sticky]');
        const travel = Math.max(1, stage.offsetHeight - (stickyElement?.offsetHeight ?? window.innerHeight));
        scrollProgress = clamp(-stage.getBoundingClientRect().top / travel, 0, 1);
      } else {
        scrollProgress = clamp(window.scrollY / Math.max(1, window.innerHeight * 0.9), 0, 1);
      }

      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const progress = reducedMotion ? 0 : scrollProgress;

      image.style.opacity = String(1 - progress);
      context.clearRect(0, 0, logicalWidth, logicalHeight);
      if (progress < 0.015) return;

      context.font = Math.ceil(cellSize * 0.75) + 'px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
      context.textAlign = 'center';
      context.textBaseline = 'middle';

      const scatter = progress * progress;
      for (const particle of particles) {
        context.globalAlpha = particle.alpha * progress;
        context.fillStyle = particle.accent ? '#d8c7b3' : '#f1efe9';
        context.fillText(
          particle.glyph,
          particle.x + particle.driftX * scatter,
          particle.y + particle.driftY * scatter,
        );
      }
      context.globalAlpha = 1;
    };

    const scheduleRender = () => {
      if (!frame) frame = window.requestAnimationFrame(render);
    };

    const rebuild = () => {
      if (!image.complete || !image.naturalWidth) return;
      const bounds = wrapper.getBoundingClientRect();
      logicalWidth = Math.max(1, Math.round(bounds.width));
      logicalHeight = Math.max(1, Math.round(bounds.height));
      ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(logicalWidth * ratio);
      canvas.height = Math.round(logicalHeight * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      sampler.width = logicalWidth;
      sampler.height = logicalHeight;
      sampleContext.clearRect(0, 0, logicalWidth, logicalHeight);

      const scale = fit === 'cover'
        ? Math.max(logicalWidth / image.naturalWidth, logicalHeight / image.naturalHeight)
        : Math.min(logicalWidth / image.naturalWidth, logicalHeight / image.naturalHeight);
      const drawWidth = image.naturalWidth * scale;
      const drawHeight = image.naturalHeight * scale;
      const x = (logicalWidth - drawWidth) / 2;
      const yFraction = position.includes('%')
        ? clamp(parseFloat(position.match(/[0-9.]+/)?.[0] ?? '50') / 100, 0, 1)
        : position.includes('bottom') ? 1 : 0.5;
      const y = (logicalHeight - drawHeight) * yFraction;
      sampleContext.drawImage(image, x, y, drawWidth, drawHeight);

      const pixels = sampleContext.getImageData(0, 0, logicalWidth, logicalHeight).data;
      cellSize = logicalWidth < 320 ? 10 : 12;
      particles = [];
      for (let py = cellSize / 2, row = 0; py < logicalHeight; py += cellSize, row += 1) {
        for (let px = cellSize / 2, col = 0; px < logicalWidth; px += cellSize, col += 1) {
          const index = (Math.floor(py) * logicalWidth + Math.floor(px)) * 4;
          const alpha = pixels[index + 3] / 255;
          if (alpha < 0.12) continue;

          const brightness = (
            pixels[index] * 0.2126 +
            pixels[index + 1] * 0.7152 +
            pixels[index + 2] * 0.0722
          ) / 255;
          const glyphIndex = Math.round((1 - brightness) * (glyphs.length - 1));
          const variation = hash(row, col);
          particles.push({
            x: px,
            y: py,
            glyph: glyphs[glyphIndex],
            alpha: Math.min(0.9, alpha * (0.35 + brightness * 0.55)),
            driftX: (variation - 0.5) * 42 + (px - logicalWidth / 2) / logicalWidth * 24,
            driftY: 12 + hash(col, row) * 88 + Math.abs(px - logicalWidth / 2) / logicalWidth * 26,
            accent: variation > 0.91,
          });
        }
      }
      scheduleRender();
    };

    const handleLoad = () => rebuild();
    image.addEventListener('load', handleLoad);
    if (image.complete) rebuild();

    const resizeObserver = new ResizeObserver(rebuild);
    resizeObserver.observe(wrapper);
    window.addEventListener('scroll', scheduleRender, { passive: true });
    window.addEventListener('resize', rebuild, { passive: true });

    return () => {
      image.removeEventListener('load', handleLoad);
      resizeObserver.disconnect();
      window.removeEventListener('scroll', scheduleRender);
      window.removeEventListener('resize', rebuild);
      if (frame) window.cancelAnimationFrame(frame);
      image.style.opacity = '1';
    };
  }, [fit, position]);

  return (
    <div
      ref={wrapperRef}
      className={[styles.asciiImage, className].filter(Boolean).join(' ')}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        style={{ objectFit: fit, objectPosition: position, opacity: 1 }}
      />
      <canvas className={styles.asciiCanvas} aria-hidden="true" />
    </div>
  );
}
