import { config } from 'dotenv-flow';

/**
 * Loads the environment variables.
 *s
 * @returns {void}
 */
export const loadEnv = () => {
    config({
        silent: true,
        default_node_env: 'development',
    });
};
