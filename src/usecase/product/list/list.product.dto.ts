// tslint:disable-next-line:no-empty-interface
interface InputListProductDto {}

interface Product {
    id: string;
    name: string;
    price: number;
}

interface OutputListProductDto {
    products: Product[];
}
