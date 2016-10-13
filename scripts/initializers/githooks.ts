import {f} from '../utils';

f('config/githooks').files.forEach((filepath) => {
	const tpl = f(filepath);
	const hook = f(`.git/hooks/${tpl.basename}`);

	tpl.generate(hook).chmod(777);
});
