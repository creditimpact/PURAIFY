export function validateBlueprint(blueprint) {
  const errors = [];
  const warnings = [];

  if (!blueprint || typeof blueprint !== 'object') {
    errors.push({ field: 'blueprint', reason: 'object required' });
    return { valid: false, errors, warnings };
  }

  if (!blueprint.trigger || typeof blueprint.trigger !== 'object') {
    errors.push({ field: 'trigger', reason: 'trigger object required' });
  } else if (typeof blueprint.trigger.type !== 'string') {
    errors.push({ field: 'trigger.type', reason: 'string required' });
  }

  if (!Array.isArray(blueprint.actions)) {
    errors.push({ field: 'actions', reason: 'actions array required' });
  } else if (blueprint.actions.length === 0) {
    errors.push({ field: 'actions', reason: 'at least one action required' });
  } else {
    const allowed = ['log_message', 'send_slack', 'http_request', 'create_sheet'];
    blueprint.actions.forEach((a, idx) => {
      if (!a || typeof a !== 'object') {
        errors.push({ field: `actions[${idx}]`, reason: 'action object required' });
        return;
      }
      if (typeof a.type !== 'string') {
        errors.push({ field: `actions[${idx}].type`, reason: 'string required' });
      } else if (!allowed.includes(a.type)) {
        errors.push({ field: `actions[${idx}].type`, reason: `unknown action: ${a.type}` });
      }
      if (a.params && typeof a.params !== 'object') {
        errors.push({ field: `actions[${idx}].params`, reason: 'object expected' });
      } else if (a.type === 'send_slack') {
        if (!a.params?.channel || !a.params?.message) {
          errors.push({ field: `actions[${idx}].params`, reason: 'channel and message required' });
        }
      } else if (a.type === 'http_request') {
        if (!a.params?.url) {
          errors.push({ field: `actions[${idx}].params.url`, reason: 'url required' });
        }
      } else if (a.type === 'create_sheet') {
        if (!a.params?.sheetId || !Array.isArray(a.params?.row)) {
          errors.push({ field: `actions[${idx}].params`, reason: 'sheetId and row required' });
        }
      }
    });
  }

  return { valid: errors.length === 0, errors, warnings };
}
