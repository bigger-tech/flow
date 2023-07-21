import { INaturalPersonFieldsRequest } from './INaturalPersonFieldsRequest';

export default class NaturalPersonFieldsRequest implements INaturalPersonFieldsRequest {
	familyName?: string;
	lastName?: string;
	givenName?: string;
	firstName?: string;
	additionalName?: string;
	addressCountryCode?: string;
	stateOrProvince?: string;
	city?: string;
	postalCode?: string;
	address?: string;
	mobileNumber?: string;
	emailAddress?: string;
	birthDate?: string;
	birthPlace?: string;
	birthCountryCode?: string;
	bankAccountNumber?: string;
	taxId?: string;
	taxIdName?: string;
	occupation?: number;
	employerName?: string;
	employerAddress?: string;
	languageCode?: string;
	idType?: string;
	idCountryCode?: string;
	idIssueDate?: string;
	idExpirationDate?: string;
	idNumber?: string;
	photoIdFront?: string;
	photoIdBack?: string;
	notaryApprovalOfPhotoId?: string;
	ipAddress?: string;
	photoProofResidence?: string;
	sex?: string;
	proofOfIncome?: string;
	proofOfLiveness?: string;

	constructor(request: INaturalPersonFieldsRequest) {
		const {
			familyName,
			lastName,
			givenName,
			firstName,
			additionalName,
			addressCountryCode,
			stateOrProvince,
			city,
			postalCode,
            address,
            mobileNumber,
            emailAddress,
            birthDate,
            birthPlace,
            birthCountryCode,
            bankAccountNumber,
            taxId,
            taxIdName,
            occupation,
            employerName,
            employerAddress,
            languageCode,
            idType,
            idCountryCode,
            idIssueDate,
            idExpirationDate,
            idNumber,
            photoIdFront,
            photoIdBack,
            notaryApprovalOfPhotoId,
            ipAddress,
            photoProofResidence,
            sex,
            proofOfIncome,
            proofOfLiveness,
		} = request;

		this.familyName = familyName;
		this.lastName = lastName;
        this.givenName = givenName;
        this.firstName = firstName;
        this.additionalName = additionalName;
        this.addressCountryCode = addressCountryCode;
        this.stateOrProvince = stateOrProvince;
        this.city = city;
        this.postalCode = postalCode;
        this.address = address;
        this.mobileNumber = mobileNumber;
        this.emailAddress = emailAddress;
        this.birthDate = birthDate;
        this.birthPlace = birthPlace;
        this.birthCountryCode = birthCountryCode;
        this.bankAccountNumber = bankAccountNumber;
        this.taxId = taxId;
        this.taxIdName = taxIdName;
        this.occupation = occupation;
        this.employerName = employerName;
        this.employerAddress = employerAddress;
        this.languageCode = languageCode;
        this.idType = idType;
        this.idCountryCode = idCountryCode;
        this.idIssueDate = idIssueDate;
        this.idExpirationDate = idExpirationDate;
        this.idNumber = idNumber;
        this.photoIdFront = photoIdFront;
        this.photoIdBack = photoIdBack;
        this.notaryApprovalOfPhotoId = notaryApprovalOfPhotoId;
        this.ipAddress = ipAddress;
        this.photoProofResidence = photoProofResidence;
        this.sex = sex;
        this.proofOfIncome = proofOfIncome;
        this.proofOfLiveness = proofOfLiveness;
	}
}
