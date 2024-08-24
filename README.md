# Brakbricks BricksetAPI

A typescript library for Brickset API V3

See https://brickset.com/article/52664/api-version-3-documentation

This implementation follows the API documentation, so methods of the client match those described in the documentation from brickset.

It maps date strings from the API response to Javascript Date objects.

## Usage

Obtain an API Key for the Brickset API, [check here](https://brickset.com/article/52664/api-version-3-documentation)

```ts
import { BricksetApiClient } from '@brakbricks/brickset-api';

const client = new BricksetApiClient('your-super-secret-api-key');

//Get a single set by set
const [set] = await client.getSets({
    setNumber: '42172-1'
});

const instructions = await client.getInstructionsBySetNumber('42172-1');

```

## Documentation

See https://brakbricks.github.io/brickset-api/

## Report bugs

See https://github.com/brakbricks/brickset-api/issues
