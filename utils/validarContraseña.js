function validarContraseña(contraseña) {
    const minLength = 8;
    const tieneMayuscula = /[A-Z]/.test(contraseña);
    const tieneMinuscula = /[a-z]/.test(contraseña);
    const tieneEspecial = /[^A-Za-z0-9]/.test(contraseña);
    const tieneLongitudMinima = contraseña.length >= minLength;
    const noTieneNumerosConsecutivos = !/(\d)\1/.test(contraseña);
    const noTieneLetrasConsecutivas = !/(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)/i.test(contraseña);

    return tieneMayuscula && tieneMinuscula && tieneEspecial && tieneLongitudMinima && noTieneNumerosConsecutivos && noTieneLetrasConsecutivas;
}

module.exports = { validarContraseña };
