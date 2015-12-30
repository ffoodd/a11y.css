# -*- encoding : utf-8 -*-
Hologram::CodeExampleRenderer::Factory.define 'css' do
  example_template 'css_example_template'

  lexer { Rouge::Lexer.find('css') }
end
