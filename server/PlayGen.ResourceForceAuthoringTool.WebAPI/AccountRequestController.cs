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

        [HttpPost]
        public IActionResult CreateRequest([FromBody]AccountChangeRequest request)
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

            var accountRequest = _accountRequestController.Get(requestModel.PlayerId, requestModel.Region);
            if (accountRequest != null)
            {
                if (accept)
                {
                    _accountRequestController.Update(requestModel.Region, requestModel);
                }
                _accountRequestController.Delete(accountRequest.Id);
                return;
            }
            throw new Exception($"No Request found for playerId {requestModel.PlayerId} and region {requestModel.Region}");
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
		/// Get all requests for a specific region
		/// </summary>
		/// <returns></returns>
		[HttpGet("validator/{region}")]
		public IActionResult GetValidatorRequests([FromRoute]string region)
		{
            var regions = JsonConvert.DeserializeObject<string[]>(region);
            var requestContract = new List<AccountChangeResponse>();
			if (region == null)
			{
				return null;
            }
            foreach (var reg in regions)
            {
                var accountResponse = _accountRequestController.Get(reg);
                if (accountResponse != null)
                {
                    foreach (var accountRequest in accountResponse)
                    {
                        requestContract.Add(accountRequest.ToAccountResponse());
                    }
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
