export class User{

    displayName: string;
    email: string;
    phoneNumber: string;
    password:string;
    photoURL: string;
    uid: string;
    customerClaims: string;
    constructor(displayName: string,
        email: string,
        phoneNumber: string,
        password: string,
        photoURL: string,
        uid: string,
        customerClaims: string) {
        
        this.displayName = displayName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.photoURL = photoURL;
        this.uid = uid;
        this.customerClaims = customerClaims;
        
    }
    setUserModel(displayName: string,
        email: string,
        phoneNumber: string,
        password: string,
        photoURL: string,
        uid: string,
        customerClaims : string) {
        console.log("USER SETUSERMODEL CLASS ", displayName, email, phoneNumber, password, photoURL, uid);
        this.displayName = displayName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.photoURL = photoURL;
        this.uid = uid;
        this.customerClaims = customerClaims;
    }
}