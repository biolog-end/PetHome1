import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import './PageHotelsQuestions.css';

const PageHotelsQuestions = () => {
  const ballContainerRef = useRef(null);
  const textElementRef = useRef(null);
  const ballRef = useRef(null);

  function getRelativeCoords(element, parent) {
    const elementRect = element.getBoundingClientRect();
    const parentRect = parent.getBoundingClientRect();

    return {
      left: elementRect.left - parentRect.left,
      top: elementRect.top - parentRect.top,
      width: elementRect.width,
      height: elementRect.height
    };
  }

  useEffect(() => {
    const { Engine, Render, Runner, Bodies, Composite, Body, Events, World } = Matter;

    const engine = Engine.create();
    const world = engine.world;

    const timeScale = 2; 
    engine.timing.timeScale = timeScale;

    const render = Render.create({
      element: ballContainerRef.current,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: 'transparent'
      }
    });

    function getBallSize() {
      const screenWidth = window.innerWidth;

      if (screenWidth < 480) {
        return 40;
      } else if (screenWidth < 768) {
        return 60;
      } else {
        return Math.min(window.innerWidth * 0.05, 74);
      }
    }

    function getBallProperties() {
      const screenWidth = window.innerWidth;
      if (screenWidth > 1530) { 
        return { position: { x: window.innerWidth, y: 50  }, velocity: {  x: -18.5, y: 3 } };
      } else if (screenWidth >= 1360) {
        return { position: { x: window.innerWidth, y: 30 }, velocity: { x: -16.35, y: 3 } };
      } else if (screenWidth >= 1300) {
        return { position: { x: window.innerWidth, y: 20 }, velocity: { x: -15, y: 3 } };
      } else if (screenWidth >= 1240) {
        return { position: { x: window.innerWidth, y: 20 }, velocity: { x: -14.6, y: 15 } };
      } else if (screenWidth >= 1160) {
        return { position: { x: window.innerWidth, y: 20 }, velocity: { x: -13.7, y: 15 } };
      } else if (screenWidth >= 1060) {
        return { position: { x: window.innerWidth, y: 200 }, velocity: { x: -13.9, y: 10 } };
      } else if (screenWidth >= 1024) {
        return { position: { x: window.innerWidth, y: 250 }, velocity: { x: -13, y: 5 } };
      } else if (screenWidth >= 862) {
        return { position: { x: window.innerWidth, y: 250 }, velocity: { x: -16.1, y: 0 } };
      } else if (screenWidth >= 600) {
        return { position: { x: window.innerWidth, y: 250 }, velocity: { x: -13.7, y: 5 } };
      } else if (screenWidth >= 400) {
        return { position: { x: window.innerWidth, y: 300 }, velocity: { x: -9.65, y: 6 } };
      } else if (screenWidth >= 276) {
        return { position: { x: window.innerWidth, y: 500 }, velocity: { x: -8, y: 3 } };
      } else {
        return { position: { x: window.innerWidth, y: 500 }, velocity: { x: -5, y: 5 } };
      } 
    }

    let ballSize = getBallSize();

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "166");
    svg.setAttribute("height", "166");
    svg.setAttribute("viewBox", "0 0 166 166");
    svg.setAttribute("fill", "none");
    svg.innerHTML = `
        <g clip-path="url(#a)">
            <path d="M158 77a66 66 0 0 1 0 10v2a29 29 0 0 1 0 3v2a38 38 0 0 1 0 3l-1 1a42 42 0 0 1 0 2l-1 2a54 54 0 0 1-1 6l-1 2-1 2a49 49 0 0 1-3 6v1l-1 1v2l-1 1a25 25 0 0 1-2 2 53 53 0 0 1-2 4l-1 1A73 73 0 0 1 13 93a73 73 0 0 1 119-65l1 1a20 20 0 0 1 2 2 51 51 0 0 1 4 4l1 1v1h1l1 1v1l1 1 1 1a71 71 0 0 1 9 15v1a70 70 0 0 1 1 3 45 45 0 0 1 2 5v2a51 51 0 0 1 2 10Z" fill="#769E36"/>
            <path d="M154 73a69 69 0 0 1 0 7v4a27 27 0 0 1 0 3v1a39 39 0 0 1-1 2v1a36 36 0 0 1-1 5v3a54 54 0 0 1-2 6l-1 2v2a49 49 0 0 1-3 6l-1 1a15 15 0 0 1-1 1 23 23 0 0 1-1 2v1a24 24 0 0 1-1 2 51 51 0 0 1-3 4h-1a73 73 0 1 1-11-101l1 1a20 20 0 0 1 2 2 50 50 0 0 1 4 4l1 1h1v1l1 1 1 1 1 1a71 71 0 0 1 7 12l1 2 1 2 1 1v1a41 41 0 0 1 2 6v1l1 1v1a48 48 0 0 1 1 7l1 2Z" fill="#8CC63F"/>
            <path d="m120 28 3 2h1v1h1l1 1 1 1v1h1l1 1 1 1v1h1v1h1v1l1 1 1 1a65 65 0 0 1 6 9v1l1 5h1l1 1v2h1v2l1 1v3l1 2v2a60 60 0 0 1 1 11v7a48 48 0 0 0 0 2v2a100 100 0 0 1-1 2v2l-1 2v2a74 74 0 0 1-2 5v2h-1v2l-1 1v2h-1v2h-1v1l-1 1v1h-1v1l-1 1-1 1v2h-1v1h-1l-2 3a66 66 0 0 1-11-97m-1-9a73 73 0 0 0 13 115 74 74 0 0 0 6-8h1l1-2a40 40 0 0 0 3-4v-1a34 34 0 0 0 1-2l1-1 1-1v-1a38 38 0 0 0 3-5v-1a68 68 0 0 0 1-3 74 74 0 0 0 2-6v-3a42 42 0 0 0 1-2v-1a22 22 0 0 0 0-2v-1a47 47 0 0 0 1-2v-1a25 25 0 0 0 0-2v-2a48 48 0 0 0 0-7 64 64 0 0 0-2-12v-1l-1-1v-3a39 39 0 0 0-2-4v-1l-1-1a29 29 0 0 0-2-4 56 56 0 0 0-2-4 71 71 0 0 0-6-9l-1-1-1-1v-1h-1a57 57 0 0 0-7-7l-1-1a70 70 0 0 0-8-6ZM31 37a66 66 0 0 1 11 98 67 67 0 0 1-11-98Zm-1-8-3 3a73 73 0 0 0 16 112A73 73 0 0 0 30 29Z" fill="#DBF2B6"/>
            <path d="M154 73a64 64 0 0 1 0 11v1a26 26 0 0 1 0 3 39 39 0 0 1-1 4v3a42 42 0 0 1-1 2v2a56 56 0 0 1-2 6l-1 2v2l-1 1v1a60 60 0 0 1-2 4l-1 1a16 16 0 0 1-1 1v1l-1 1v1a24 24 0 0 1-1 2 48 48 0 0 1-3 4h-1l-3 5a73 73 0 0 1-12-110l4 4 1 1a21 21 0 0 1 2 2 51 51 0 0 1 4 4l1 1h1v1a34 34 0 0 1 2 2l1 1a72 72 0 0 1 7 12 83 83 0 0 1 2 4l1 1v1a41 41 0 0 1 2 4v3l1 1v1a51 51 0 0 1 2 9ZM58 84c2 22-5 42-19 57A73 73 0 0 1 27 32c17 12 28 30 31 52Z" fill="#8CC63F"/>
        </g>
        <defs>
            <clipPath id="a">
                <path fill="#fff" transform="rotate(-6 153 5)" d="M0 0h150v150H0z"/>
            </clipPath>
        </defs>
    `;

    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(svg);
    const svgURL = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgStr);

    const ball = Bodies.circle(window.innerWidth, 50, ballSize / 2, {
      restitution: 1,
      friction: 0.005,
      render: {
        sprite: {
          texture: svgURL,
          xScale: ballSize / 166,
          yScale: ballSize / 166
        }
      }
    });

    ballRef.current = ball;

    let textBarrier = Bodies.rectangle(0, 0, 0, 0, { isStatic: true, render: { visible: false } });
    Composite.add(world, [ball, textBarrier]);

    function updateTextBarrier() {
      const textRect = getRelativeCoords(textElementRef.current, ballContainerRef.current);
      Body.setPosition(textBarrier, { 
        x: textRect.left + textRect.width / 2, 
        y: textRect.top + textRect.height / 2 
      });
      Body.setVertices(textBarrier, Bodies.rectangle(0, 0, textRect.width, textRect.height).vertices);
    }

    function updateBallSizeAndProperties() {
      const newBallSize = getBallSize();
      if (newBallSize !== ballSize) {
        ballSize = newBallSize;
        Body.scale(ball, ballSize / (ball.circleRadius * 2), ballSize / (ball.circleRadius * 2));
        ball.render.sprite.xScale = ballSize / 166;
        ball.render.sprite.yScale = ballSize / 166;
      }

      const { position, velocity } = getBallProperties();
      Body.setPosition(ball, position);
      Body.setVelocity(ball, velocity);
    }

    function handleResize() {
      render.canvas.width = window.innerWidth;
      render.canvas.height = window.innerHeight;
      render.options.width = window.innerWidth;
      render.options.height = window.innerHeight;
      Render.setPixelRatio(render, window.devicePixelRatio || 1);

      updateTextBarrier();
      updateBallSizeAndProperties();
    }

    updateTextBarrier();
    window.addEventListener('resize', handleResize);

    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    function resetBall() {
      updateBallSizeAndProperties();
    }

    Body.setVelocity(ball, { x: -18.5, y: 3 });

    Events.on(engine, 'afterUpdate', () => {
      const ballPosition = ball.position;

      if (ballPosition.x < -ballSize) {
        resetBall();
      }

      if (ballPosition.y > window.innerHeight + ballSize || ballPosition.x > window.innerWidth + ballSize) {
        resetBall();
      }
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      Runner.stop(runner);
      Render.stop(render);

      World.clear(world);
      Engine.clear(engine);

      render.canvas.remove();
      render.canvas = null;
      render.context = null;

      render.textures = {};
    };
  }, []);

  return (
    <div className="ball-questions-QuestionBlock">
      <div ref={ballContainerRef} id="ball-ball-container"></div>
      <div className="ball-questions-container">
        <h1 ref={textElementRef}>HAVE QUESTIONS?</h1>
        <p>Contact us at <span className="ball-questions-phone-number">858-449-2691</span>.</p>
        <button className="ball-questions-book-now">Contact us</button>
      </div>
    </div>
  );
};

export default PageHotelsQuestions;
