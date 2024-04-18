export interface UserModel {
    userName: string,
    password: string

}
export interface AuthenticateResponse{
    personal_token: string;
  }
  

export interface UserModelRequest{
    userName: string; 
    email: string; 
    lastName: string; 
    countryId: number; 
    stateId?: number; 
    phoneNumber: string; 
    hobbies: number[];
    
}
export interface UserModelResponse{
    userName: string;
    firstName: string;
    lastName: string;
    countryId: number;
    stateId: number | null;
    email: string;
    phoneNumber: string | null;
    birthDate: Date | null;
    avatarUrl: string | null;
    hobbies: number[];
}
export interface HobbyModel{
    id:number,
    name:string
}

export interface CountryModel{
    id:number,
    name:string
}
export interface StateModel{
    id:number,
    name:string
}