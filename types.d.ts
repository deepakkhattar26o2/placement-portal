export interface AccountPatchRequest {
  id: number;
  name?: string;
  email?: string;
  website?: string;
  about?: string;
}
export interface SignupRequest {
  email: string;
  password: string;
  name: string;
}

export interface PlacementDriveRequest {
  company_id: number;
  other_eligibility_criteria: string;
  current_cgpa_cutoff: number;
  matric_result_cutoff: number;
  hsc_result_cutoff: number;
  allowed_backlogs: number;
  batch_requried: number;
  type_of_drive: string;
  positions: string[];
  stream_required: string[];
  skills_required: string[];
  job_profile: string;
  job_location: string;
  pay_package: string;
  bond?: string;
  placement_process: string;
  date_of_drive: Date;
  closes_at: Date;
}

export interface DrivePatchRequest {
  id: number;
  eligibility_criteria?: string;
  batch_requried?: number;
  type_of_drive?: string;
  positions?: string[];
  stream_required?: string[];
  skills_required?: string[];
  job_profile?: string;
  job_location?: string;
  pay_package?: string;
  bond?: string;
  placement_process?: string;
  date_of_drive?: Date;
  closes_at?: Date;
}
