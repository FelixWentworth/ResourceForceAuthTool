using Microsoft.AspNetCore.Mvc;
using PlayGen.ResourceForceAuthoringTool.Contracts;
using PlayGen.ResourceForceAuthoringTool.Core.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;

using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace PlayGen.ResourceForceAuthoringTool.WebAPI
{
    [Route("api/[controller]")]
    public class AccountRequestController
    {
        private readonly Core.AccountRequestController _accountRequestController;

        public AccountRequestController(Core.AccountRequestController accoutnRequestController)
        {
            _accountRequestController = accoutnRequestController;
        }


        #region Create

        [HttpPost("validator")]
        public IActionResult ValidatorRequest([FromBody]AccountChangeRequest request)
        {
            var requestModel = request.ToAccountRequestModel();

            var accountRequest = _accountRequestController.Create(requestModel);
            if (request != null)
            {
                var metadata = accountRequest.ToMetadata();
                return new ObjectResult(metadata);
            }
            throw new Exception("Unable to create request");
        }

        [HttpPost("validator/{accept}")]
        public void SetValidatorRequestAprroval([FromBody]AccountChangeRequest request, [FromRoute] bool accept)
        {
            var requestModel = request.ToAccountRequestModel();

            var accountRequest = _accountRequestController.Get(requestModel.PlayerId, requestModel.Location, requestModel.Language);
            if (accountRequest != null)
            {
                if (accept)
                {
                    _accountRequestController.Update(requestModel.Location, requestModel.Language, requestModel);
                }
                _accountRequestController.Delete(accountRequest.Id);
                return;
            }
            throw new Exception($"No Request found for playerId {requestModel.PlayerId} and language {requestModel.Language} in {requestModel.Location}");
        }


        #endregion

        #region Read

        /// <summary>
        /// Get all requests
        /// </summary>
        /// <returns></returns>
        [HttpGet("validator")]
        public IActionResult GetValidatorRequests()
        {
            var accountResponse = _accountRequestController.Get();
            if (accountResponse == null)
            {
                return new ObjectResult(null);
            }
            var requestContract = new List<AccountChangeResponse>();
            foreach (var accountRequest in accountResponse)
            {
                requestContract.Add(accountRequest.ToAccountResponse());
            }
            return new ObjectResult(requestContract);
        }

		/// <summary>
		/// Get all requests for a specific location and language
		/// </summary>
		/// <returns></returns>
		[HttpGet("validator/{location}/{language}")]
		public IActionResult GetValidatorRequests([FromRoute]string location, [FromRoute]string language)
		{
            var requestContract = new List<AccountChangeResponse>();
			if (location == null || language == null)
			{
				return null;
            }
			var accountResponse = _accountRequestController.Get(location, language);
			if (accountResponse != null)
			{
				foreach (var accountRequest in accountResponse)
				{
					requestContract.Add(accountRequest.ToAccountResponse());
				}
			}

			return new ObjectResult(requestContract);
        }

        #endregion

        #region Updated

        #endregion

        #region Delete

        [HttpDelete("validator/{id}")]
        public void DeleteRequest([FromRoute] int id)
        {
            _accountRequestController.Delete(id);
        }
        #endregion
    }
}
