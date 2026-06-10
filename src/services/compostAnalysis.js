// Fuente:
// Haug, R. T. (1993)
// The Practical Handbook of Compost Engineering
//
// Temperaturas superiores a 55°C
// favorecen sanitización,
// mientras temperaturas bajas
// pueden indicar menor actividad.

export function analyzeTemperature(
    temperature
) {
    if (temperature === null) {
        return [];
    }

    if (temperature < 40) {
        return [{
            type: "warning",
            parameter: "Temperatura",
            message: "La temperatura se encuentra por debajo del rango termófilo."
        }];
    }

    if (temperature >= 55) {
        return [{
            type: "success",
            parameter: "Temperatura",
            message: "Se mantiene actividad termófila adecuada."
        }];
    }

    return [{
        type: "info",
        parameter: "Temperatura",
        message: "Actividad biológica moderada."
    }];
}

// Fuente:
// Bernal et al. (2009)
//
// Humedad típica recomendada:
// aproximadamente 50-60%.

export function analyzeHumidity(
    humidity
) {
    if (
        humidity === null ||
        humidity === undefined
    ) {
        return [{
            type: "info",
            parameter: "Humedad",
            message: "No existen datos de humedad registrados."
        }];
    }

    if (humidity < 50) {
        return [{
            type: "warning",
            parameter: "Humedad",
            message: "La humedad podría ser insuficiente."
        }];
    }

    if (humidity > 65) {
        return [{
            type: "warning",
            parameter: "Humedad",
            message: "La humedad podría limitar la aireación."
        }];
    }

    return [{
        type: "success",
        parameter: "Humedad",
        message: "La humedad se encuentra dentro de un rango adecuado."
    }];
}

// Fuente:
// Epstein (2011)
//
// Intervalos comunes:
// pH 6.5-8.0

export function analyzePh(ph) {
    if (
        ph === null ||
        ph === undefined
    ) {
        return [{
            type: "info",
            parameter: "pH",
            message: "No existen datos de pH registrados."
        }];
    }

    if (ph < 6.5) {
        return [{
            type: "warning",
            parameter: "pH",
            message: "El material presenta tendencia ácida."
        }];
    }

    if (ph > 8.5) {
        return [{
            type: "warning",
            parameter: "pH",
            message: "El material presenta tendencia alcalina."
        }];
    }

    return [{
        type: "success",
        parameter: "pH",
        message: "El pH se encuentra dentro de un rango aceptable."
    }];
}

export function generateRecommendations({
    temperature,
    humidity,
    ph
}) {
    return [
        ...analyzeTemperature(temperature),
        ...analyzeHumidity(humidity),
        ...analyzePh(ph)
    ];
}