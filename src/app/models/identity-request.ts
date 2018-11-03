import { IdentityInterface } from './identity-interface';

export class IdentityRequest implements IdentityInterface
{
    id: number;
    name: string;
    email: string;
    password: string;
}
