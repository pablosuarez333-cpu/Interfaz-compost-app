export function getLotMeasurements(
    measurements,
    lotId
) {
    return measurements.filter(
        (measurement) =>
        measurement.lotId === lotId
    );
}

export function getCurrentTemperature(
    measurements,
    lotId
) {
    const lotMeasurements =
        getLotMeasurements(
            measurements,
            lotId
        );

    if (
        lotMeasurements.length === 0
    ) {
        return null;
    }

    return lotMeasurements.at(-1)
        .temperature;
}

export function getMaximumTemperature(
    measurements,
    lotId
) {
    const lotMeasurements =
        getLotMeasurements(
            measurements,
            lotId
        );

    if (
        lotMeasurements.length === 0
    ) {
        return null;
    }

    return Math.max(
        ...lotMeasurements.map(
            (measurement) =>
            measurement.temperature
        )
    );
}

export function getAverageTemperature(
    measurements,
    lotId
) {
    const lotMeasurements =
        getLotMeasurements(
            measurements,
            lotId
        );

    if (
        lotMeasurements.length === 0
    ) {
        return null;
    }

    const total =
        lotMeasurements.reduce(
            (
                accumulator,
                measurement
            ) =>
            accumulator +
            measurement.temperature,
            0
        );

    return Number(
        (
            total /
            lotMeasurements.length
        ).toFixed(2)
    );
}

export function getTemperatureSeries(
    measurements,
    lotId
) {
    return measurements
        .filter(
            (measurement) =>
            measurement.lotId === lotId
        )
        .sort(
            (a, b) =>
            a.day - b.day
        )
        .map(
            (measurement) => ({
                day: measurement.day,
                temperature: measurement.temperature
            })
        );
}

export function getComparisonSeries(
    measurements
) {
    const groupedDays = {};

    measurements.forEach(
        (measurement) => {
            if (!groupedDays[
                    measurement.day
                ]) {
                groupedDays[
                    measurement.day
                ] = {
                    day: measurement.day
                };
            }

            groupedDays[
                    measurement.day
                ][
                    measurement.lotId
                ] =
                measurement.temperature;
        }
    );

    return Object.values(
        groupedDays
    ).sort(
        (a, b) =>
        a.day - b.day
    );
}