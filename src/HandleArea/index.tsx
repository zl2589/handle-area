import React, { useEffect, useRef } from "react";
import "./index.css";

interface CoordinateProps {
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
}

interface Props {
  children?: any;
  style: any;
  onAreaFinish: (cooradinate: CoordinateProps) => void;
  onDown?: (e: any) => void;
  onMove?: (e: any) => void;
  bgColor?: string;
  moveBorder?: string;
  finishBorder?: string;
}

function HandleArea(props: Props, ref: any) {
  const {
    children,
    style,
    onAreaFinish,
    onDown,
    onMove,
    bgColor = "#067ff888",
    moveBorder = "1px solid rgb(0, 120, 215)",
    finishBorder = "1px dashed red",
  } = props;

  let coordinate: CoordinateProps = {};

  const areaRef = useRef<any>(null);
  const boxRef = useRef<any>(null);

  useEffect(() => {
    areaRef.current = document.getElementById("handleArea");
    boxRef.current = document.getElementById("box");

    if (!areaRef.current || !boxRef.current) {
      return;
    }

    areaRef.current.addEventListener("mousedown", onMouseDown);
    areaRef.current.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseover", onMouseOver);

    return () => {
      areaRef.current.removeEventListener("mousedown", onMouseDown);
      areaRef.current.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseover", onMouseOver);

      areaRef.current = undefined;
      boxRef.current = undefined;
    };
  }, []);

  function onMouseDown(e: any) {
    coordinate = {
      x1: e.clientX,
      y1: e.clientY,
    };
    areaRef.current.addEventListener("mousemove", onMouseMove);
    onDown && onDown(e);
  }
  function onMouseMove(e: any) {
    const domRect = areaRef.current.getBoundingClientRect();
    const totalLeft = e.clientX < coordinate.x1! ? e.clientX : coordinate.x1;
    const totalTop = e.clientY < coordinate.y1! ? e.clientY : coordinate.y1;
    const fnLeft = totalLeft - (domRect?.left || 0);
    const fnTop = totalTop - (domRect?.top || 0);
    const _syl = {
      left: fnLeft + "px",
      top: fnTop + "px",
      backgroundColor: bgColor,
      width: Math.abs(e.clientX - coordinate.x1!) + "px",
      height: Math.abs(e.clientY - coordinate.y1!) + "px",
      border: Math.abs(e.clientX - coordinate.x1!) ? moveBorder : 0,
    };
    operation(e, _syl);
    onMove && onMove(e);
  }
  function onMouseUp(e: any) {
    coordinate = {
      ...coordinate,
      x2: e.clientX,
      y2: e.clientY,
    };
    const domRect = areaRef.current.getBoundingClientRect();
    const totalLeft = e.clientX < coordinate.x1! ? e.clientX : coordinate.x1;
    const totalTop = e.clientY < coordinate.y1! ? e.clientY : coordinate.y1;
    const fnLeft = totalLeft - (domRect?.left || 0);
    const fnTop = totalTop - (domRect?.top || 0);
    const _syl = {
      left: fnLeft + "px",
      top: fnTop + "px",
      backgroundColor: "",
      width: Math.abs(e.clientX - coordinate.x1!) + "px",
      height: Math.abs(e.clientY - coordinate.y1!) + "px",
      border: Math.abs(e.clientX - coordinate.x1!) ? finishBorder : 0,
    };
    operation(e, _syl);
    areaRef.current.removeEventListener("mousemove", onMouseMove);

    onAreaFinish && onAreaFinish(coordinate);
  }

  function onMouseOver(e: any) {
    if (e.target !== areaRef.current && !areaRef.current.contains(e.target)) {
      _init();
      const _syl = {
        left: 0,
        top: 0,
        backgroundColor: "",
        border: 0,
        width: 0,
        height: 0,
      };
      operation(e, _syl);
    }
  }

  function operation(e: any, style: any) {
    boxRef.current.style.left = style.left;
    boxRef.current.style.top = style.top;
    boxRef.current.style.backgroundColor = style.backgroundColor;
    boxRef.current.style.width = style.width;
    boxRef.current.style.height = style.height;
    boxRef.current.style.border = style.border;
  }

  function _init() {
    coordinate = {
      x1: undefined,
      y1: undefined,
      x2: undefined,
      y2: undefined,
    };
  }

  return (
    <div
      ref={areaRef}
      className="handle-area"
      id="handleArea"
      style={{ ...style }}
    >
      {children}
      <div ref={boxRef} className="box" id="box"></div>
    </div>
  );
}

export default HandleArea;
