import { FinancialConfigurationController } from "../../controllers/FinancialConfiguration.controller";
import bankValidator from "../../validators/Bank.validator";
import bankBRValidator from "../../validators/BankBR.validator";
import {
  BankRequest,
  ConceptType,
  CostCenterRequest,
} from "../../../../domain";
import { FastifyInstance } from "fastify";

const financialConfigurationRoute = async (fastify: FastifyInstance) => {
  fastify.post("/cost-center", async (req, res) => {
    await FinancialConfigurationController.createOrUpdateCostCenter(
      req.body as CostCenterRequest,
      res,
    );
  });

  fastify.get("/cost-center/:churchId", async (req, res) => {
    const { churchId } = req.params as any;
    await FinancialConfigurationController.findCostCenterByChurchId(
      churchId,
      res,
    );
  });

  //TODO sera necesario crear endpoint por pais para el registro de banco?
  fastify.post(
    "/bank",
    { preHandler: [bankValidator, bankBRValidator] },
    async (req, res) => {
      await FinancialConfigurationController.createOrUpdateBank(
        req.body as BankRequest,
        res,
      );
    },
  );

  fastify.get("/bank/:churchId", async (req, res) => {
    const { churchId } = req.params as any;
    await FinancialConfigurationController.listBankByChurchId(churchId, res);
  });

  fastify.get("/bank/data/:bankId", async (req, res) => {
    const { bankId } = req.params as any;
    await FinancialConfigurationController.findBankByBankId(bankId, res);
  });

  fastify.get(
    "/financial-concepts/:churchId/:typeConcept",
    async (req, res) => {
      const { churchId, typeConcept } = req.params as any;
      await FinancialConfigurationController.findFinancialConceptsByChurchIdAndTypeConcept(
        churchId,
        typeConcept as ConceptType,
        res,
      );
    },
  );
};
export default financialConfigurationRoute;
