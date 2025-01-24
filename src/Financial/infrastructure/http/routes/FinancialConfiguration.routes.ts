import { Router } from "express"
import { FinancialConfigurationController } from "../controllers/FinancialConfiguration.controller"
import bankValidator from "../validators/Bank.validator"
import bankBRValidator from "../validators/BankBR.validator"
import {
  AvailabilityAccountRequest,
  BankRequest,
  ConceptType,
  CostCenterRequest,
} from "../../../domain"
import { PermissionMiddleware } from "../../../../Shared/infrastructure"
import AvailabilityAccountValidator from "../validators/AvailabilityAccount.validator"
import {
  createOrUpdateAvailabilityAccount,
  listAvailabilityAccountByChurchId,
} from "../controllers/AvailabilityAccount.controller"
import {
  CreateCostCenterController,
  FindCostCenterByChurchIdController,
  UpdateCostCenterController,
} from "../controllers/CostCenter.controller"

const financialConfigurationRoute = Router()

financialConfigurationRoute.post(
  "/cost-center",
  PermissionMiddleware,
  async (req, res) => {
    await CreateCostCenterController(req.body as CostCenterRequest, res)
  }
)

financialConfigurationRoute.put(
  "/cost-center",
  PermissionMiddleware,
  async (req, res) => {
    await UpdateCostCenterController(req.body as CostCenterRequest, res)
  }
)

financialConfigurationRoute.get("/cost-center/:churchId", async (req, res) => {
  const { churchId } = req.params as any
  await FindCostCenterByChurchIdController(churchId, res)
})

//TODO sera necesario crear endpoint por pais para el registro de banco?
financialConfigurationRoute.post(
  "/bank",
  [PermissionMiddleware, bankValidator, bankBRValidator],
  async (req, res) => {
    await FinancialConfigurationController.createOrUpdateBank(
      req.body as BankRequest,
      res
    )
  }
)

financialConfigurationRoute.get(
  "/bank/:churchId",
  PermissionMiddleware,
  async (req, res) => {
    const { churchId } = req.params as any
    await FinancialConfigurationController.listBankByChurchId(churchId, res)
  }
)

financialConfigurationRoute.get("/bank/data/:bankId", async (req, res) => {
  const { bankId } = req.params as any
  await FinancialConfigurationController.findBankByBankId(bankId, res)
})

financialConfigurationRoute.get(
  "/financial-concepts/:churchId/:typeConcept?",
  PermissionMiddleware,
  async (req, res) => {
    const { churchId, typeConcept } = req.params as any

    await FinancialConfigurationController.findFinancialConceptsByChurchIdAndTypeConcept(
      churchId,
      res,
      typeConcept as ConceptType
    )
  }
)

financialConfigurationRoute.post(
  "/availability-account/",
  [PermissionMiddleware, AvailabilityAccountValidator],
  async (req, res) => {
    await createOrUpdateAvailabilityAccount(
      req.body as AvailabilityAccountRequest,
      res
    )
  }
)

financialConfigurationRoute.get(
  "/availability-account/:churchId",
  PermissionMiddleware,
  async (req, res) => {
    const { churchId } = req.params as any
    await listAvailabilityAccountByChurchId(churchId, res)
  }
)

export default financialConfigurationRoute
