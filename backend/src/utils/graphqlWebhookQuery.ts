export const getGraphqlQuery = (assetFactoryAddress: string) => `{
    block {
      # Block hash is a great primary key to use for your data stores!
      hash,
      number,
      timestamp,
      # Add smart contract addresses to the list below to filter for specific logs
      logs(filter: {addresses: [${assetFactoryAddress}], topics: []}) {
        data,
        topics,
        index,
        account {
          address
        },
        transaction {
          hash,
          nonce,
          index,
          from {
            address
          },
          to {
            address
          },
          value,
          gasPrice,
          maxFeePerGas,
          maxPriorityFeePerGas,
          gas,
          status,
          gasUsed,
          cumulativeGasUsed,
          effectiveGasPrice,
          createdContract {
            address
          }
        }
      }
    }
  }
`