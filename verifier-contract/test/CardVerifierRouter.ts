import { expect } from 'chai';
import { ethers } from 'hardhat';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { 
  CardVerifier,
  CardVerifierRouter 
} from '../typechain-types';

const proofA: any = [
  '0x0fe79a65253571300924c141b4cd9f6bdab9078d605f4a52ab86f39fabe9b08c',
  '0x205ebf8cdc6a1ad07930849b363150d4c19ea627d1c64568787a3e0135ef13c8'
]

const proofB: any = [
  [
    '0x2749af972ae8421d650ad3d2f90692264a953fe0187fffecd3f526a138725764',
    '0x2392ea6434d1bce0b9499ff0fd291cfe20553d7236efa0d65ddacaab3ce322eb'
  ],
  [
    '0x254a65b4619a4071af6f53255090373fbe6f46e4aaa653637a767377757e708e',
    '0x063c629d46eedd4d58488d112a81aa5cf106bde5b36743f7ac3719b7ab0faa8a'
  ]
]

const proofC: any = [
  '0x2559c1d15395fd1a184fcd583c1b17c62c1cedab06acb938329142971610a93e',
  '0x122c05c3eaf591bb28ad06fff14c7476580d0b85a7c64dbf7ea42bf0fb808034'
]

const publicSignals: any = [
  '0x0a295629f4df155d579f2714da4c7e47ebf2f1d79de41c7dc9a81c46feae439c',
  '0x2eb026d514ecb68f084f81de3fdb82e8866c440a7eae33c8f664429c6ecc3dac'
]

const randomOneOrZero = () => {
  return Math.round(Math.random());
}

describe('CardVerifierRouter', async () => {
  let user1: SignerWithAddress; 
  let user2: SignerWithAddress; 
  let cv: CardVerifier
  let cgv: CardVerifierRouter;

  before(async () => {
    [user1, user2] = await ethers.getSigners();

    const CardVerifier = await ethers.getContractFactory('CardVerifier');
    cv = await CardVerifier.deploy();
    const cvAddress = cv.getAddress();
    
    const CardVerifierRouter = await ethers.getContractFactory('CardVerifierRouter');
    cgv = await CardVerifierRouter.deploy(cvAddress);
  });

  describe('VerifyProof', async () => {
    const hash = 'abc';
    const amount = 10;

    it('Should return successfully', async () => {
      await cgv.connect(user1).addTransactionHashedInfo(hash, amount);
      const dataBefore = await cgv.transactionHashedToDetails(hash);

      await cgv
        .connect(user1)
        .verifyTransaction(
          hash, 
          proofA, 
          proofB, 
          proofC, 
          publicSignals
        );

      const dataAfter = await cgv.transactionHashedToDetails(hash)

      expect(dataBefore[1]).equal(1);
      expect(dataAfter[1]).equal(3);
    });

    let user1Amount = 0;
    let user2Amount = 0;
    it('Should return get log', async () => {
      const txs = [
        { number: 437, chars: "XHZ" },
        { number: 984, chars: "KLM" },
        { number: 263, chars: "BCA" },
        { number: 145, chars: "ZYQ" },
        { number: 756, chars: "WER" },
        { number: 319, chars: "MNO" },
        { number: 841, chars: "PQT" },
        { number: 278, chars: "UVZ" },
        { number: 530, chars: "JKL" },
        { number: 672, chars: "ABC" }
      ];

      for (let { number, chars } of txs) {
        await cgv.connect(user1).addTransactionHashedInfo(
          chars, 
          number
        );  

        const user = [user1, user2][randomOneOrZero()];

        if (user.address === user1.address) user1Amount += 1;
        else user2Amount += 1;

        await cgv
          .connect(user)
          .verifyTransaction(
            chars, 
            proofA, 
            proofB, 
            proofC, 
            publicSignals
          );
      }

      const verifies1 = await cgv.queryFilter(
        cgv.filters.Verify(user1), 
        0, 
        'latest'
      );

      const userEvents: any = [];
      verifies1.forEach((event) => {
        const [, hashed, proof] = event.args;

        const e = {
          hashed,
          proof,
        };

        userEvents.push(e);
      });
      console.log(userEvents)

      // const v = va

      // const verifies2 = await cgv.queryFilter(
      //   cgv.filters.Verify(user2), 
      //   0, 
      //   'latest'
      // );

      // const tsh = await cgv.queryFilter(
      //   cgv.filters.TransactionHashed(), 
      //   0, 
      //   'latest'
      // );

      // expect(verifies1.length).equal(user1Amount);
      // expect(verifies2.length).equal(user2Amount);


      // console.log(verifies1.length, user1Amount)
      // console.log(verifies2.length, user2Amount)

      // console.log(tsh)
    })
  });
});
