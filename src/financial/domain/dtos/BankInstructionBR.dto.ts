export const BankInstructionBR = (bankInstruction: any) => {
  return {
    codigoBanco: bankInstruction.codeBank,
    agencia: bankInstruction.agency,
    conta: bankInstruction.account,
  };
};
