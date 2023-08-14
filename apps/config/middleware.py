from django.utils.translation import activate, gettext_lazy as _


class LanguageMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.META.get('CONTENT_TYPE') != 'application/json':
            return self.get_response(request)

        language = request.META.get('HTTP_ACCEPT_LANGUAGE')

        if language:
            language = language.split(',')[0][:2]
            if language in ['es', 'en']:
                activate(language)
            else:
                activate('pt-br')
        else:
            activate('pt-br')

        return self.get_response(request)
