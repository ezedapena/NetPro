import { MedicalStatus } from "./medical-status.interface"

export interface Case {
  id: string
  client_name: string
  doa: string
  medical_status: MedicalStatus
  client_status: string
  law_firm: string
}