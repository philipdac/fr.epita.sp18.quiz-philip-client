import { IdentityInterface } from './identity-interface';

export class IdentityResponse implements IdentityInterface
{
    id: number;
    name: string;
    email: string;
}
