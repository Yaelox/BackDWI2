function validarContraseña(contraseña) {
    const longitudMinima = 8;
    const tieneMayuscula = /[A-Z]/.test(contraseña);
    const tieneMinuscula = /[a-z]/.test(contraseña);
    const tieneCaracterEspecial = /[^a-zA-Z0-9]/.test(contraseña);
    const noNumerosConsecutivos = !/(?:([0-9])\1{1})/.test(contraseña);
    const noLetrasConsecutivas = !/(?:([a-zA-Z])\1{1})/.test(contraseña);
    const noAlfabeticoConsecutivo = !/(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|ABC|BCD|CDE|DEF|EFG|FGH|GHI|HIJ|IJK|JKL|KLM|LMN|MNO|NOP|OPQ|PQR|QRS|RST|STU|TUV|UVW|VWX|WXY|XYZ)/.test(contraseña);

    return contraseña.length >= longitudMinima &&
        tieneMayuscula &&
        tieneMinuscula &&
        tieneCaracterEspecial &&
        noNumerosConsecutivos &&
        noLetrasConsecutivas &&
        noAlfabeticoConsecutivo;
}

module.exports = validarContraseña;
