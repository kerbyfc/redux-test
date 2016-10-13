interface IValidator<TRules, TResult> {
	validate(value: any, rules?: TRules): TResult;
	check(value: any, rules?: TRules): boolean;
}

