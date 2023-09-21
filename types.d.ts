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
  role : "UNIVERSITY"
}

export interface StudentSignupRequest {
  university_email: string;
  password: string;
  first_name: string;
  last_name: string;
  uid: string;
}

export interface StudentLoginRequest{
  university_email : string;
  password : string
}

export interface PlacementDriveRequest {
  company_about: string;
  company_name: string;
  company_website: string;
  
  drive_name: string;
  type_of_drive: string;
  date_of_drive: Date;
  
  bond: string;
  placement_process: string;
  closes_at: Date;
  
  positions: string[];
  skills_required: string[];
  stream_required: string;
  
  current_cgpa_cutoff: number;
  matric_result_cutoff: number;
  hsc_result_cutoff: number;
  
  other_eligibility_criteria: string;
  allowed_backlogs: number;
  batch_requried: number;
  
  
  job_location: string;
  job_profile: string;
  pay_package: string;
}

export interface DrivePatchRequest {
  id: number;
  eligibility_criteria?: string;
  batch_requried?: number;
  type_of_drive?: string;
  positions?: string[];
  stream_required?: string;
  skills_required?: string[];
  job_profile?: string;
  job_location?: string;
  pay_package?: string;
  bond?: string;
  placement_process?: string;
  date_of_drive?: Date;
  closes_at?: Date;
}
