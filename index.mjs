import { NFTStorage } from "nft.storage"
import fs from 'fs/promises'
import minimist from "minimist"
import mime from 'mime-types'
import { basename } from "path"
import { File } from "nft.storage"

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDJGOTgxMDdhNEZhMTJEZTMwYjE2MEJCYTkzRWJBQzdhMDczNGJGYTgiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1MDI1MTA2NzYyMCwibmFtZSI6InVwbG9hZCJ9.dtn0gfj6H7iEBlxn0dyxsisl5ltqEo7zKrltJLG8uuY'

async function storeNFT(imageFilename, name, description) {
    const client = new NFTStorage ({ token })

    const fileData = await fs.readFile(imageFilename)
    const type = mime.lookup(imageFilename)

    const image = new File([fileData], basename(imageFilename), { type })

    return client.store({
        image,
        name,
        description,
    })
}

async function main() {
    const args = minimist(process.argv.slice(2))
    if (!args.image) {
        throw new Error('no image')
    }
    if (!args.name) {
        throw new Error('no name')
    }

    const { image, name, description } = args
    const metadata = await storeNFT(image, name, description)
    console.log(metadata)
}

main()