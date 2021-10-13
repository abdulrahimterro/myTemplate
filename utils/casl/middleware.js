const { Ability, defineAbility, ForbiddenError } = require('@casl/ability');
const { Exception, DeprecatedException, statusCodes } = require('usol-utils');
const { CompanyType } = require('../../../core/company/meta');

module.exports = (action, model) => (req, res, next) => {
	if (next === undefined) next = res;
	const companyType = req.user.personalInfo.company?.type || 'Admin';
	const systemAbilities = require(`./abilities`)[model];

	const userAbilities = systemAbilities[companyType];
	if (!userAbilities) throw new DeprecatedException(statusCodes.FORBIDDEN);

	req.user.abilities = new Ability(userAbilities(req.user));
	const modelToAccess = model === 'MetaData' ? 'GMDevice' : model;
	if (req.user.abilities.can(action, modelToAccess)) next();
	else throw new DeprecatedException(statusCodes.FORBIDDEN);
};
