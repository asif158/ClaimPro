export interface Claim {
    _id: string;
    name: string;
    email: string;
    claimAmount: number;
    description: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    submissionDate: string;
    approvedAmount?: number;
    insurerComments?: string;
    document?: string;
  }
  
  export interface ClaimFormData {
    name: string;
    email: string;
    claimAmount: number;
    description: string;
    document: File | null;
  }