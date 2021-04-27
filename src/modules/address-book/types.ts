export interface UserPicture {
  thumbnail: string;
  large: string;
}

export interface UserLocation {
  street: {
    name: string;
    number: string;
  };
  city: string;
  state: string;
  postcode: string;
}

export interface UserName {
  first: string;
  last: string;
  username: string;
}

export interface User {
  picture: UserPicture;
  location?: UserLocation;
  name: UserName;
  email: string;
  phone?: string;
}
