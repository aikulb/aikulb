import { useState, useEffect } from 'react';

/**
 * Custom hook to detect if user has prefers-reduced-motion active or is on a touch device.
 */
export const useAnimationAccessibility = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);

    const handleMotionChange = (e) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotionChange);

    const checkTouch = () => {
      setIsTouchDevice(
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches
      );
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('resize', checkTouch);
    };
  }, []);

  return { prefersReducedMotion, isTouchDevice };
};

/**
 * Calculate 3D tilt rotation based on mouse coordinates relative to element bounds.
 */
export const calculateTilt = (e, element, maxRotateX = 4, maxRotateY = 6) => {
  if (!element) return { rotateX: 0, rotateY: 0 };
  const rect = element.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  // rotateX is inverted relative to Y offset
  const rotateX = ((y - centerY) / centerY) * -maxRotateX;
  const rotateY = ((x - centerX) / centerX) * maxRotateY;

  return { rotateX, rotateY };
};
