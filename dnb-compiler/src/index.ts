import compiler from './compiler';

const code = `
Paper 100
Pen 0
Line 50 15 85 80
Line 85 80 15 80
Line 15 80 50 15
`;
const result = compiler.compile(code);

console.log(result);
