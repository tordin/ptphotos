<% response.setContentType("text/javascript"); %>
<%= request.getParameter("callback") %>(
{ "success":true, "album_count":3, "latest_pictures_count":80 }
)
