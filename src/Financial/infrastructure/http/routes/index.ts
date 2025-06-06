import { Router } from "express"
import financialConfigurationRoute from "./FinancialConfiguration.routes"
import financeContribution from "./FinanceContribution.routes"
import financialRecordRoutes from "./FinancialRecord.routes"
import financialConceptRoutes from "./FinancialConcept.routes"

const financialRouter = Router()

financialRouter.use("/configuration", financialConfigurationRoute)
financialRouter.use("/configuration/financial-concepts", financialConceptRoutes)
financialRouter.use("/contributions", financeContribution)
financialRouter.use("/financial-record", financialRecordRoutes)

export default financialRouter
