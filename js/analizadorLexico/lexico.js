function Token(patron, token_name, ignore) {
    this.patron = patron;
    this.token_name = token_name;
    this.ignore = ignore;
}
function Tokens(name, lexema, index, line) {
    this.name = name;
    this.lexema = lexema;
    this.index = index;
    this.line = line;
}
var palabras_reservadas = [
    "if", "else",
    "for", "while",
    "return", "case",
    "var", "main",
    "console", "class",
    "function", "throw",
    "let", "const",
    "get", "set",
    "new", "break",
    "continue", "in",
    "switch", "try",
    "document", "write",
    "catch", "do",
    "delete", "this",
    "try", "default",
    "with"
];
let tokens = [];
let patron;
tokens.push(new Token(/\d*\.?\d+/gm, "DIGITO", false));
tokens.push(new Token(/\".*?\"/gm, "CADENA", false));
tokens.push(new Token(/'\\.'|'[^\\]'/gm, "CARACTER", false));
tokens.push(new Token(/\n+/gm, "NEW LINE", false));
tokens.push(new Token(/\s+/gm,"ESPACIOS",true)),
tokens.push(new Token(/\/\/[^\r\n]*/, "COMENTARIO", false));
tokens.push(new Token(/[\(\)\{\}\[\];,]/gm, "DELIMITADOR", false));
tokens.push(new Token(/\b[_a-zA-Z][\w]*\b/gm, "IDENTIFICADOR", false));
tokens.push(new Token(/>|<|==|>=|<=|!/gm, "COMPARADOR", false));
tokens.push(new Token(/[\.\+\-/*%]/gm, "OPERADOR", false));
tokens.push(new Token(/-=|\+=|\*=|\/=|%=|=/gm, "OPERADOR DE ASIGNACIÓN", false));
tokens.push(new Token(/&&|\|\|/gm, "OPERADOR LOGICO", false));
tokens.push(new Token(/\+\+/gm, "OPERADOR DE INCREMENTO", false));
tokens.push(new Token(/--/gm, "OPERADOR DE DECREMENTO", false));
function analizarCodigo() {
    document.getElementById("tabla").innerHTML = '<thead><th scope="col">Token</th><th scope="col">Lexema</th><th scope="col">Index</th><th scope="col">Linea</th></thead > ';
    let texto = document.getElementById('area-texto').value;
    for (const key in tokens_lex = getTokens(texto)) {
        document.getElementById("tabla").innerHTML += '<tbody><tr><th scope="row">' + tokens_lex[key].name + '</th><td>' + tokens_lex[key].lexema + '</td><td>' + tokens_lex[key].index + '</td><td>' + tokens_lex[key].line + '</td></tr></tbody>';
    }
}
function getTokens_2(text) {
    tokens_lex = [];
    line = 0;
    for (const key in tokens) {
        if(matches = tokens[key].patron.exec(text)){
            if(!tokens[key].ignore){
                if(contains(matches[0])){
                    tokens_lex.push(new Tokens('RESERVADA', matches[0], matches.index, line));
                }else{
                    tokens_lex.push(new Tokens(tokens[key].token_name, matches[0], matches.index, line));
                }
            }
        }else{
            
        }
    }
    return tokens_lex;
}
function getTokens(text) {
    line = 0;
    tokens_lex = [];
    let index = 0;
    for (const key in tokens) {
        let rex = tokens[key].patron;
        let matches;
        while ((matches = rex.exec(text)) != null) {
            if (matches.index === rex.lastIndex) {
                rex.lastIndex++;
            }
            if (!tokens[key].ignore) {
                if((/NEW LINE/gm).test(tokens[key].token_name)){
                    line += contarLineas(text);
                }else{
                    if (contains(matches[0])) {
                        index += matches.Index + matches[0].Length;
                        tokens_lex.push(new Tokens('RESERVADA', matches[0], matches.index, line));
                    } else {
                        index += matches.Index + matches[0].Length;
                        tokens_lex.push(new Tokens(tokens[key].token_name, matches[0], matches.index, line));
                    }
                }
            }
        }
    }
    return tokens_lex;
}
function contains(texto) {
    for (let index = 0; index < palabras_reservadas.length; index++) {
        if (palabras_reservadas[index] == texto) {
            return true;
        }
    }
    return false;
}
function contarLineas(texto) {
    line_temp = 0;
    for (let i = 0; i < texto.length; i++) {
        if (/\n/gm.test(texto)) {
            line_temp++;
        }
        return line_temp;
    }
}
