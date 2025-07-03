function isValidDateFormat(stringDate) {
    // Regex para validação inicial do formato de data
    const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    if(!regex.test(stringDate)) return false;

    // Verificando se é uma data válida (Para casos como exemplo: 31 de fevereiro)
    date = new Date(stringDate);
    return date.toISOString().slice(0, 10) == stringDate;

}

module.exports = isValidDateFormat;