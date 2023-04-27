import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";
import {Sequelize} from "sequelize-typescript";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";


describe("Unit test find product use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should find a product", async () => {
        const productRepository = new ProductRepository();
        const usecase = new FindProductUseCase(productRepository);

        const product = new Product("123", "Cookie", 10.0);
        await productRepository.create(product)

        const input = {
            id: "123",
        };

        const output = {
            id: "123",
            name: "Cookie",
            price: 10.0
        }

        const result = await usecase.execute(input);

        expect(result).toEqual(output);
    });

    it("should not find a product", async () => {
        const productRepository = new ProductRepository();
        const usecase = new FindProductUseCase(productRepository);

        const input = {
            id: "456",
        };

        await expect(() => {
            return usecase.execute(input);
        }).rejects.toThrow("Product not found");
    });
});