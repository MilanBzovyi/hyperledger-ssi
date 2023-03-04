export type Service = {
  '@id': string
  type: string
  serviceEndpoint: string
  label: string
}

export type Claim = {
  'mime-type'?: string
  name: string
  value: string
}

export type HealthCheckup =
  | 'bmi'
  | 'waist'
  | 'tg'
  | 'rbc'
  | 'plt'
  | 'blood_pressure'
  | 'eyesight'
  | 'tc'
  | 'ua'
  | 'wbc'
  | 'hearing'
  | 'fpg'
  | 'patient_id'
  | 'vital_capacity'
