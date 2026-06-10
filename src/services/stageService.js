/*
Fuentes:

Epstein, E. (2011)
Industrial Composting

Haug, R. T. (1993)
The Practical Handbook of Compost Engineering

NOTA:

La maduración real requiere
indicadores biológicos y químicos
adicionales.

La clasificación implementada
es una aproximación basada en
temperatura e historial térmico.
*/

export function classifyTemperature(
    temperature
) {
    if (temperature > 55) {
        return "Termófila";
    }

    if (
        temperature >= 40 &&
        temperature <= 55
    ) {
        return "Termófila Moderada";
    }

    return "Mesófila";
}

export function determineStage(
    measurements = []
) {
    if (!measurements.length) {
        return "Sin datos";
    }

    const ordered = [...measurements].sort(
        (a, b) => a.day - b.day
    );

    const latest =
        ordered.at(-1);

    const maxTemperature =
        Math.max(
            ...ordered.map(
                (item) =>
                item.temperature
            )
        );

    const averageLastThree =
        ordered
        .slice(-3)
        .reduce(
            (acc, item) =>
            acc +
            item.temperature,
            0
        ) /
        Math.min(
            ordered.length,
            3
        );

    if (
        latest.temperature > 55
    ) {
        return "Termófila";
    }

    if (
        latest.temperature >=
        40 &&
        latest.temperature <=
        55
    ) {
        return "Termófila Moderada";
    }

    if (
        maxTemperature >= 40 &&
        latest.temperature <
        40
    ) {
        if (
            latest.day >= 30 &&
            averageLastThree <
            35
        ) {
            return "Maduración";
        }

        return "Enfriamiento";
    }

    return "Mesófila";
}

export function buildStageHistory(
    measurements = []
) {
    if (!measurements.length) {
        return [];
    }

    const ordered = [...measurements].sort(
        (a, b) => a.day - b.day
    );

    let maxTempSeen = 0;

    return ordered.map(
        (measurement) => {
            maxTempSeen =
                Math.max(
                    maxTempSeen,
                    measurement.temperature
                );

            let stage =
                classifyTemperature(
                    measurement.temperature
                );

            if (
                maxTempSeen >= 40 &&
                measurement.temperature <
                40
            ) {
                stage =
                    "Enfriamiento";
            }

            return {
                day: measurement.day,
                temperature: measurement.temperature,
                stage
            };
        }
    );
}