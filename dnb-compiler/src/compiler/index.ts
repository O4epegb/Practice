import { parser } from './parser';
import { tokenizer } from './tokenizer';
import { transformer } from './transformer';
import { generator } from './generator';
export * from './interfaces';


export const compiler = {
    VERSION: '0.0.1',
    tokenizer,
    parser,
    transformer,
    generator,
    compile(code) {
        return this.generator(this.transformer(this.parser(this.tokenizer(code))));
    }
};

export default compiler;
