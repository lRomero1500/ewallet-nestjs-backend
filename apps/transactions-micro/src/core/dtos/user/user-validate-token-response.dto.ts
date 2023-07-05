export class UserValidateTokenResponseDTO {
  userId?: string;
  isValid: boolean;
  error?: 'Expired' | 'Other';
}
