import {f} from '../utils';

f('.git/hooks/pre-commit').write(f('scripts/wizards/commit.ts').es5, 777).shebang();
f('.git/hooks/prepare-commit-msg').write(f('scripts/validators/tabs.ts').es5, 777).shebang();
