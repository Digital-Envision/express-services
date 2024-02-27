# Express Services CLI

Download all the available express services from the [`services`](https://github.com/Digital-Envision/express-services/) directory.

## Usage

```bash
npx @digital-envision/express-services
```

## Options

| Name           |   Type   | Description            |  Required  |
| -------------- | :------: | ---------------------- | :--------: |
| `-h`, `--help` |   `-`    | Show help.             |    `-`     |
| `-p`, `--path` | `string` | Specify download path. |   `Yes`    |
| `-n`, `--name` | `string` | Specify service name.  |   `Yes`    |
| `--token`      | `string` | Add GitHub token.      | `Optional` |

## Examples

```bash
# Download user-service
npx @digital-envision/express-services -p ./services -n user-service
```

## Authors

- Muhammad Firdaus Sati (https://github.com/krsbx)
