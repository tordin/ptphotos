<% response.setContentType("text/javascript"); %>
<%= request.getParameter("callback") %>(
{ "success":true, "likers_only":true }
)
