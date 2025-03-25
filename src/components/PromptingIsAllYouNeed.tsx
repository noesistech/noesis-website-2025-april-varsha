import React, { useEffect, useRef } from "react"

// Constants for the game
const BALL_RADIUS = 10;
const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 15;
const PADDLE_OFFSET = 30;
const BALL_SPEED = 5;
const TEXT_SIZE = 36;

// Helper classes
class Ball {
  constructor(x, y, radius, dx, dy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
    this.color = "#a074ff";
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  update(width, height, leftPaddle, rightPaddle, textPositions) {
    // Wall collision (top/bottom)
    if (this.y + this.dy < this.radius || this.y + this.dy > height - this.radius) {
      this.dy = -this.dy;
    }

    // Paddle collision
    if (
      (this.x - this.radius < PADDLE_OFFSET + PADDLE_WIDTH &&
        this.y > leftPaddle.y &&
        this.y < leftPaddle.y + PADDLE_HEIGHT) ||
      (this.x + this.radius > width - PADDLE_OFFSET - PADDLE_WIDTH &&
        this.y > rightPaddle.y &&
        this.y < rightPaddle.y + PADDLE_HEIGHT)
    ) {
      this.dx = -this.dx;
      this.color = `hsl(${Math.random() * 360}, 80%, 70%)`;
    }

    // Text collision
    for (const pos of textPositions) {
      const dx = this.x - pos.x;
      const dy = this.y - pos.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.radius + 20) {
        // Simple bounce
        const angle = Math.atan2(dy, dx);
        this.dx = Math.cos(angle) * BALL_SPEED;
        this.dy = Math.sin(angle) * BALL_SPEED;
        this.color = `hsl(${Math.random() * 360}, 80%, 70%)`;
        break;
      }
    }

    // Reset if ball goes out of bounds
    if (this.x + this.dx < 0 || this.x + this.dx > width) {
      this.x = width / 2;
      this.y = height / 2;
      this.dx = Math.random() > 0.5 ? BALL_SPEED : -BALL_SPEED;
      this.dy = Math.random() > 0.5 ? BALL_SPEED : -BALL_SPEED;
    }

    this.x += this.dx;
    this.y += this.dy;
  }
}

class Paddle {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.targetY = y;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = "#4ea7ff";
    ctx.fill();
    ctx.closePath();
  }

  update(ballY, canvasHeight) {
    // AI movement - follow the ball with slight delay
    this.targetY = ballY - this.height / 2;
    
    // Keep paddle within canvas
    if (this.targetY < 0) {
      this.targetY = 0;
    } else if (this.targetY + this.height > canvasHeight) {
      this.targetY = canvasHeight - this.height;
    }
    
    // Smooth movement
    this.y += (this.targetY - this.y) * 0.1;
  }
}

const PromptingIsAllYouNeed = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const gameObjectsRef = useRef({
    ball: null,
    leftPaddle: null,
    rightPaddle: null,
    textPositions: []
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas.getContext("2d");
    
    const resizeCanvas = () => {
      const { width, height } = container.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
      
      // Initialize game objects after resize
      const ball = new Ball(
        width / 2,
        height / 2,
        BALL_RADIUS,
        BALL_SPEED,
        BALL_SPEED
      );
      
      const leftPaddle = new Paddle(
        PADDLE_OFFSET,
        height / 2 - PADDLE_HEIGHT / 2,
        PADDLE_WIDTH,
        PADDLE_HEIGHT
      );
      
      const rightPaddle = new Paddle(
        width - PADDLE_OFFSET - PADDLE_WIDTH,
        height / 2 - PADDLE_HEIGHT / 2,
        PADDLE_WIDTH,
        PADDLE_HEIGHT
      );
      
      // Create text positions
      const text = "PROMPTING IS ALL YOU NEED";
      const textPositions = [];
      
      ctx.font = `${TEXT_SIZE}px Arial`;
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      
      const textWidth = ctx.measureText(text).width;
      const startX = width / 2 - textWidth / 2;
      
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const charWidth = ctx.measureText(char).width;
        const x = startX + ctx.measureText(text.substring(0, i)).width + charWidth / 2;
        textPositions.push({
          x,
          y: height / 2,
          char
        });
      }
      
      gameObjectsRef.current = {
        ball,
        leftPaddle,
        rightPaddle,
        textPositions
      };
    };
    
    const animate = () => {
      const { width, height } = canvas;
      const { ball, leftPaddle, rightPaddle, textPositions } = gameObjectsRef.current;
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Draw background
      ctx.fillStyle = "rgba(20, 24, 33, 0.8)";
      ctx.fillRect(0, 0, width, height);
      
      // Update game objects
      leftPaddle.update(ball.y, height);
      rightPaddle.update(ball.y, height);
      ball.update(width, height, leftPaddle, rightPaddle, textPositions);
      
      // Draw text
      ctx.font = `${TEXT_SIZE}px Arial`;
      ctx.textAlign = "center";
      
      textPositions.forEach(pos => {
        // Calculate distance to ball for glow effect
        const dx = ball.x - pos.x;
        const dy = ball.y - pos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const glow = Math.max(0, 1 - distance / 200);
        
        // Draw glow
        if (glow > 0) {
          ctx.fillStyle = `rgba(160, 116, 255, ${glow * 0.8})`;
          ctx.font = `${TEXT_SIZE + glow * 10}px Arial`;
          ctx.fillText(pos.char, pos.x, pos.y);
        }
        
        // Draw text
        ctx.fillStyle = "white";
        ctx.font = `${TEXT_SIZE}px Arial`;
        ctx.fillText(pos.char, pos.x, pos.y);
      });
      
      // Draw game objects
      ball.draw(ctx);
      leftPaddle.draw(ctx);
      rightPaddle.draw(ctx);
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Initial setup
    resizeCanvas();
    animate();
    
    // Handle resize
    window.addEventListener("resize", resizeCanvas);
    
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <section id="prompting-game" className="py-16 bg-noesis-darker relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-noesis-darker to-black opacity-70"></div>
      <div className="container px-4 relative z-10">
        <h2 className="section-title">Interactive Demo</h2>
        <div className="text-center text-gray-300 mb-8 max-w-2xl mx-auto">
          <p>Experience our interactive pong game powered by AI. The paddles are controlled automatically while the ball interacts with the text.</p>
        </div>
        <div 
          ref={containerRef} 
          className="relative w-full aspect-video max-w-5xl mx-auto rounded-2xl overflow-hidden glass"
        >
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>
      </div>
    </section>
  );
};

export default PromptingIsAllYouNeed;
