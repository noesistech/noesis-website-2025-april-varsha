import React from 'react';
import Sketch from 'react-p5';
import p5Types from 'p5';

interface P5AnimationProps {
  className?: string;
}

const P5Animation: React.FC<P5AnimationProps> = ({ className }) => {
  // Animation configuration
  const particleCount = 100;
  const particles: { x: number; y: number; size: number; color: string; speedX: number; speedY: number }[] = [];
  const colors = [
    '#a074ff', // noesis-purple
    '#8257e6', // noesis-darkpurple
    '#4ea7ff', // noesis-blue
    '#2fcbcf', // noesis-teal
  ];

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    const canvas = p5.createCanvas(800, 500).parent(canvasParentRef);
    canvas.class(className || '');
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: p5.random(p5.width),
        y: p5.random(p5.height),
        size: p5.random(5, 15),
        color: colors[Math.floor(p5.random(colors.length))],
        speedX: p5.random(-0.5, 0.5),
        speedY: p5.random(-0.5, 0.5),
      });
    }
  };

  const draw = (p5: p5Types) => {
    p5.background(26, 31, 44, 10); // noesis-dark with low alpha for trail effect
    
    // Draw grid
    p5.stroke(255, 255, 255, 10);
    p5.strokeWeight(1);
    const gridSize = 30;
    for (let x = 0; x < p5.width; x += gridSize) {
      p5.line(x, 0, x, p5.height);
    }
    for (let y = 0; y < p5.height; y += gridSize) {
      p5.line(0, y, p5.width, y);
    }
    
    // Update and display particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      
      // Update position with a slight sine wave motion
      p.x += p.speedX + Math.sin(p5.frameCount * 0.01 + i) * 0.3;
      p.y += p.speedY + Math.cos(p5.frameCount * 0.01 + i) * 0.3;
      
      // Bounce off edges
      if (p.x < 0 || p.x > p5.width) p.speedX *= -1;
      if (p.y < 0 || p.y > p5.height) p.speedY *= -1;
      
      // Keep within bounds
      p.x = p5.constrain(p.x, 0, p5.width);
      p.y = p5.constrain(p.y, 0, p5.height);
      
      // Draw particle
      p5.noStroke();
      p5.fill(p.color);
      p5.ellipse(p.x, p.y, p.size, p.size);
      
      // Draw connections between nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const other = particles[j];
        const d = p5.dist(p.x, p.y, other.x, other.y);
        if (d < 100) {
          p5.stroke(255, 255, 255, p5.map(d, 0, 100, 50, 0));
          p5.line(p.x, p.y, other.x, other.y);
        }
      }
    }
    
    // Draw symmetrical pattern in the center
    p5.push();
    p5.translate(p5.width / 2, p5.height / 2);
    
    const time = p5.frameCount * 0.02;
    const sides = 6;
    const radius = 80 + Math.sin(time) * 20;
    
    for (let i = 0; i < sides; i++) {
      const angle = p5.TWO_PI / sides * i;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      
      p5.noFill();
      p5.strokeWeight(2);
      p5.stroke(colors[i % colors.length]);
      
      // Draw circular patterns at each vertex
      p5.push();
      p5.translate(x, y);
      p5.rotate(time + i);
      const innerRadius = 30 + Math.sin(time * 2) * 10;
      p5.ellipse(0, 0, innerRadius * 2, innerRadius * 2);
      p5.pop();
      
      // Connect vertices
      if (i < sides - 1) {
        const nextAngle = p5.TWO_PI / sides * (i + 1);
        const nextX = Math.cos(nextAngle) * radius;
        const nextY = Math.sin(nextAngle) * radius;
        p5.line(x, y, nextX, nextY);
      } else {
        // Connect last vertex to first
        const firstAngle = 0;
        const firstX = Math.cos(firstAngle) * radius;
        const firstY = Math.sin(firstAngle) * radius;
        p5.line(x, y, firstX, firstY);
      }
    }
    
    p5.pop();
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default P5Animation;
