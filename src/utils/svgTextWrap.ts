import { SVGAttributes } from 'react';

const ns = 'http://www.w3.org/2000/svg';
const makeSvgNode = (name: 'text' | 'tspan' | 'svg', doc: Document) => doc.createElementNS(ns, name);

const makeTextSpanNode = (text: string, dy: string, doc: Document) => {
  const node = doc.createTextNode(text);
  const span = makeSvgNode('tspan', doc);
  span.setAttribute('x', '0');
  span.setAttribute('y', '0');
  span.setAttribute('dy', dy);
  span.appendChild(node);
  return span;
};

const makeTextNode = (texts: string[], attrs: Record<string, any> = {}, doc: Document) => {
  const node = makeSvgNode('text', doc);
  node.setAttribute('x', '0');
  node.setAttribute('y', '0');
  for (let attr in attrs) { node.setAttribute(attr, attrs[attr]); }
  texts.forEach((t, i) => node.appendChild(makeTextSpanNode(t, `${i}em`, doc)));
  return node;
};

// Takes a string, or array of strings, some svg attrs, and gives you back a
// {width, height} of the resulting svg box containing the strings.
const svgTextSize = (texts: string[] | string, attrs: Record<string, any>, doc = document) => {
  if (typeof window === 'undefined') {
    return { width: 0, height: 0 };
  }
  const textArr = Array.isArray(texts) ? texts : [texts];
  const svg = makeSvgNode('svg', doc);
  const textNode = makeTextNode(textArr, attrs, doc);
  svg.appendChild(textNode);
  doc.body.appendChild(svg);
  const { width, height } = textNode.getBBox();
  doc.body.removeChild(svg);
  return { width, height };
};

const svgTextWrap = (text: string, width: number, attrs: Record<string, any>) => {
  if (typeof window === 'undefined') {
    return [text];
  }
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let currentLine: string[] = [];
  words.forEach(word => {
    const newLine = [...currentLine, word];
    const size = svgTextSize(newLine.join(' '), attrs, window.document);
    if (size.width > width) {
      lines.push(currentLine.join(' '));
      currentLine = [word];
    } else {
      currentLine.push(word);
    }
  });
  lines.push(currentLine.join(' '));
  if (lines[0] === '') { lines.shift(); }
  return lines;
};

export default svgTextWrap;
