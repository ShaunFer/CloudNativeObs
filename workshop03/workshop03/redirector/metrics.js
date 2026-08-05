import { metrics } from '@opentelemetry/api'

import metadata from '../package.json' with { type: 'json' }

const SERVICE_NAME = process.env.OTEL_SERVICE_NAME || metadata.name
const SERVICE_VERSION = process.env.OTEL_SERVICE_VERSION || metadata.version

const CACHE_COUNT = 'cache.count'
const HTTP_REQUEST_IN_FLIGHT = 'http.request.in.flight'
const REST_API_DURATION = 'rest.api.duration'
const CACHE_HIT_RATIO = 'cache.hit.ratio'

const meter = metrics.getMeter(SERVICE_NAME, SERVICE_VERSION)

export const cacheCountCounter = meter.createCounter(
    CACHE_COUNT,{
        description: 'URL short code cache lookup result count',
        unit: 'int'}
)

export const httpRequestInFlightUpdownCounter = meter.createUpDownCounter(
    HTTP_REQUEST_IN_FLIGHT,{
        description: 'Total number of request beign served',
        unit: 'int'
    }
)

export const restApiDurationHistogram = meter.createHistogram(
    REST_API_DURATION, {
        description: 'Duration of the recordVisti operation include geolocation and adatabase operations',
        units: 'ms'
    }
)

export const cacheRatioGauge = meter.createObservableGauge(
    CACHE_HIT_RATIO, {
        description: 'Rolling ration of URL short code lookups hits',
        unit: '1.0'
    }
)
