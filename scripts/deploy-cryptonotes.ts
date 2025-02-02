import { ethers, upgrades } from 'hardhat'

async function main() {
  // @ts-ignore
  const signer = await ethers.getSigner()
  const address = await signer.getAddress()
  console.log('signer address:', address)

  // Deploy the notes metadata descriptor contract
  const NotesMetadataDescriptor = await ethers.getContractFactory('NotesMetadataDescriptor')
  const descriptor = await NotesMetadataDescriptor.deploy()
  await descriptor.deployed()
  console.log('NotesMetadataDescriptor deployed to:', descriptor.address)

  const Cryptonotes = await ethers.getContractFactory('Cryptonotes')

  // Upgrades the Cryptonotes contract
  // const cryptonotes = await upgrades.upgradeProxy('0x', Cryptonotes)

  const cryptonotes = await upgrades.deployProxy(Cryptonotes, [
    'Ethereum Commemorative Cryptonotes',
    'ETHCC',
    18,
    '0x694AA1769357215DE4FAC081bf1f309aDC325306', // Chainlink ETH/USD price feed address Mumbai: 0x0715A7794a1dc8e42615F059dD6e406A6594651A, Goerli: 0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e
    descriptor.address
  ])
  console.log('Cryptonotes deployed to:', cryptonotes.address)
  
  // const cryptonotes = Cryptonotes.attach('0x')

  // setup a new metadta descriptor
  // const tx = await cryptonotes.setMetadataDescriptor(descriptor.address)
  // console.log('set descriptor tx hash:', tx.hash)
  // await tx.wait()

  const owner = await cryptonotes.owner()
  console.log('owner:', owner)
  const name = await cryptonotes.name()
  console.log('name:', name)
  const symbol = await cryptonotes.symbol()
  console.log('symbol:', symbol)
  // const tokenURI = await cryptonotes.tokenURI(1)
  // console.log('token URI:', tokenURI)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})

// Goerli
// Descriptor: 0x34145C89C1ba96C81cd14D09849c5B404bB413e6
// note: 0xA9d1E6C19e3eBc9c9c716a240C751A7c9b19C3bC
